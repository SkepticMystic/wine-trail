<script lang="ts">
  import type { IGeoapify } from "$lib/APIs/Geoapify/interfaces";
  import type { Country } from "$lib/const/locations";
  import type { Studio } from "$lib/models/Studio";
  import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
  import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
  import { onMount } from "svelte";

  export let location: Studio["location"];

  onMount(() => {
    const autocomplete = new GeocoderAutocomplete(
      document.getElementById("autocomplete")!,
      // TODO: Narrow down where this key can be used on Geoapify
      "85fe2e82520346fd8ec7fd8687e228e5",
      /* Geocoder options */
      {}
    );

    autocomplete.on(
      "select",
      ({
        properties,
      }: {
        type: "Feature";
        properties: IGeoapify.AutocompleteSuccessResponse;
        geometry: {
          type: "Point";
          coordinates: [number, number];
        };
      }) => {
        console.log("properties", properties);

        location = {
          country: properties.country_code.toUpperCase() as Country,
          province: properties.state,
          city: properties.city,
          town: properties.county,
          postalCode: properties.postcode,
          street: properties.street,
          houseNumber: properties.housenumber,

          coordinates: {
            latitude: properties.lat,
            longitude: properties.lon,
          },
        };
      }
    );
  });
</script>

<div id="autocomplete" class="autocomplete-container" />

<style>
  .autocomplete-container {
    position: relative;
  }
</style>
