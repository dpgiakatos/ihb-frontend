export interface ExtraVaccination {
  id?: string;
  name: string;
  date: string;
  description: string;
}

export interface ExtraVaccinationList {
  vaccinations: ExtraVaccination[];
  count: number;
}
