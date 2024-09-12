export class Constants {
    static BASE_URL = "http://localhost:5153/api/";

    // static BASE_URL = "http://localhost:8589/api/";

    // static BASE_URL = "http://192.168.1.31:8589/api/";

    // static BASE_URL = "http://110.227.214.199:8589/api/";
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
  