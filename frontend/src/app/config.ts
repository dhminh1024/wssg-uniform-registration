export const BASE_URL = import.meta.env.VITE_BASE_NAME
  ? `/${import.meta.env.VITE_BASE_NAME}`
  : ``;

export const ASSET_URL = import.meta.env.DEV
  ? ""
  : "/assets/uniform_registration/uniform";
