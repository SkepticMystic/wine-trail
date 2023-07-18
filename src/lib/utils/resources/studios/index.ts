import type { Studio } from "$lib/models/Studio";
import type { Teacher } from "$lib/models/Teachers";

export const fillInStudioBlanks = <S extends Studio>(studio: S) => {
  if (!studio.links) studio.links = {};
  if (!studio.contact) studio.contact = {};
  if (!studio.schedule) {
    studio.schedule = {
      kind: "none",
    };
  }

  return studio;
};

export const fillInTeacherBlanks = <S extends Teacher>(teacher: S) => {
  if (!teacher.links) teacher.links = {};
  if (!teacher.contact) teacher.contact = {};

  return teacher;
};
