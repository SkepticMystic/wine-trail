export declare namespace IGeoapify {
  type LocationType =
    | "country"
    | "state"
    | "city"
    | "postcode"
    | "street"
    | "amenity"
    | "locality";

  type AutocompleteSuccessResponse = {
    /** "za" */
    country_code: string;
    /** "3" */
    housenumber: string;
    /** "Siffie Crescent" */
    street: string;
    /** "South Africa" */
    country: string;
    /** "Overberg" */
    county: string;

    datasource: {
      /** "openaddresses" */
      sourcename: string;
      /** "© OpenAddresses contributors" */
      attribution: string;
      /** "BSD-3-Clause License" */
      license: string;
    };

    /** "Western Cape" */
    state: string;
    /** "Overstrand Local Municipality" */
    city: string;
    /** "WC" */
    state_code: string;
    /** "Overstrand Ward 13" */
    suburb: string;
    /** "7201" */
    postcode: string;
    /** "3 Siffie Crescent, Overstrand Ward 13, Overstrand Local Municipality, 7201, South Africa" */
    formatted: string;
    /** "3 Siffie Crescent" */
    address_line1: string;
    /** "Overstrand Ward 13, Overstrand Local Municipality, 7201, South Africa" */
    address_line2: string;
    /** 19.150967 */
    lon: number;
    /** -34.417282 */
    lat: number;

    timezone: {
      /** "Africa/Johannesburg" */
      name: string;
      /** "+02:00" */
      offset_STD: string;
      /** 7200 */
      offset_STD_seconds: number;
      /** "+02:00" */
      offset_DST: string;
      /** 7200 */
      offset_DST_seconds: number;
      /** "SAST" */
      abbreviation_STD: string;
      /** "SAST" */
      abbreviation_DST: string;
    };

    /** "4FQXH5M2+39" */
    plus_code: string;
    /** "building" */
    result_type: string;
    rank: {
      /** 1 */
      confidence: number;
      /** "full_match" */
      match_type: string;
    };
    /** "5176c6f7c5a526334059d09a1f7f693541c0c00203e2034b6f70656e6164647265737365733a616464726573733a7a612f636f756e747279776964652d6164647265737365732d636f756e7472792e6373763a36313238656537346165656563653337" */
    place_id: string;
  };
}
