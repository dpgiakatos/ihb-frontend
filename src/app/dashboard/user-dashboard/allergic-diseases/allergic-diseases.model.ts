export interface AllergicDiseases {
  id: string;
  name: string;
  diseaseDescription: string;
  treatmentDescription: string;
}

export interface AllergicDiseasesList {
  allergics: AllergicDiseases[];
  count: number;
}
