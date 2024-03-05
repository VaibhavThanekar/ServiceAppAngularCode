export class Constants {
    static BASE_URL = "http://localhost:5153/api/";
}

export interface DurationList{
    id: number;
    duration: string;
  }

  export const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  };
  