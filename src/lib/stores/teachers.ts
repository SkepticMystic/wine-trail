import type { Result, SID } from "$lib/interfaces";
import type { ModifyTeacher, Teacher } from "$lib/models/Teachers";
import { err } from "$lib/utils";
import { getHTTPErrorMsg } from "$lib/utils/errors";
import { fillInTeacherBlanks } from "$lib/utils/resources/studios";
import axios from "axios";
import { get, writable } from "svelte/store";
import { addToast } from "./toast";

const store = writable<SID<Teacher>[]>([]);

export const teachers = {
  ...store,

  getBy: (query: { _id?: string; slug?: string }) => {
    const teachers = get(store);
    return teachers.find((teacher) => {
      if (query._id) {
        return teacher._id === query._id;
      }
      if (query.slug) {
        return teacher.slug === query.slug;
      }
      return false;
    });
  },

  create: async (teacher: ModifyTeacher) => {
    try {
      const { data } = await axios.post<
        Result<
          { teacher: SID<Teacher> },
          string
        >
      >("/api/teachers", teacher);

      console.log(data);

      if (data.ok) {
        store.update((
          teachers,
        ) => [...teachers, fillInTeacherBlanks(data.data.teacher)]);

        addToast({
          type: "success",
          message: "Teacher created",
          duration_ms: 5_000,
        }, { clearQueue: true });
      } else {
        console.warn(data.error);
        addToast({
          type: "warning",
          message: data.error,
          duration_ms: 5_000,
        });
      }

      return data;
    } catch (error) {
      console.error(error);
      const message = getHTTPErrorMsg(error);
      addToast({
        type: "error",
        message,
      });

      return err(message);
    }
  },

  patch: async (teacher_id: string, patch: Partial<ModifyTeacher>) => {
    try {
      const { data } = await axios.patch<
        Result<
          { teacher?: SID<Teacher> },
          string
        >
      >(
        `/api/teachers/${teacher_id}`,
        patch,
      );

      console.log(data);

      if (data.ok) {
        if (data.data.teacher) {
          const newTeacher = data.data.teacher;
          store.update((teachers) =>
            teachers.map((teacher) =>
              teacher._id === teacher_id
                ? fillInTeacherBlanks(newTeacher)
                : teacher
            )
          );

          addToast({
            type: "success",
            message: "Teacher updated",
            duration_ms: 5_000,
          }, { clearQueue: true });
        } else {
          addToast({
            type: "success",
            message:
              "Teacher updated! Our team will review your changes shortly.",
          }, { clearQueue: true });
        }
      } else {
        console.warn(data.error);
        addToast({
          type: "warning",
          message: data.error,
        });
      }

      return data;
    } catch (error) {
      console.error(error);

      const message = getHTTPErrorMsg(error);
      addToast({
        type: "error",
        message,
      });

      return err(message);
    }
  },

  delete: async (teacher_id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) {
      return err("Teacher delete cancelled");
    }

    try {
      const { data } = await axios.delete<Result<undefined, string>>(
        `/api/teachers/${teacher_id}`,
      );

      console.log(data);

      if (data.ok) {
        store.update((teachers) =>
          teachers.filter((teacher) => teacher._id !== teacher_id)
        );

        addToast({
          type: "success",
          message: "Teacher deleted",
          duration_ms: 5_000,
        }, { clearQueue: true });
      } else {
        console.warn(data.error);
        addToast({
          type: "warning",
          message: data.error,
          duration_ms: 5_000,
        });
      }

      return data;
    } catch (error) {
      console.error(error);

      const message = getHTTPErrorMsg(error);
      addToast({
        type: "error",
        message,
      });

      return err(message);
    }
  },

  invite: async (teacher_id: string, email: string | undefined) => {
    if (!email) {
      return err("No email provided");
    }
    if (
      !confirm(
        `Are you sure you want to invite ${email} to be this teacher?`,
      )
    ) {
      return err("Teacher invite cancelled");
    }

    try {
      const { data } = await axios.post<Result<undefined, string>>(
        `/api/teachers/${teacher_id}/invite`,
        { email },
      );

      console.log(data);

      if (data.ok) {
        addToast({
          type: "success",
          message: "Teacher invite sent",
          duration_ms: 5_000,
        }, { clearQueue: true });
      } else {
        console.warn(data.error);
        addToast({
          type: "warning",
          message: data.error,
          duration_ms: 5_000,
        });
      }

      return data;
    } catch (error) {
      console.error(error);

      const message = getHTTPErrorMsg(error);
      addToast({
        type: "error",
        message,
      });

      return err(message);
    }
  },
};
