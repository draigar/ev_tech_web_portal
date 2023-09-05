export interface layoutTypes {
    children: any;
    title?: string;
    data?: any;
    pageTitle?: string;
    subTitle?: string;
  }

  export interface filterProp {
    formData: formDataType[];
    filterUrl: string;
    button: {
      label: string;
    };
    urlType: 'path' | 'query';
  }

  export interface formDataType {
    type: 'input' | 'select' | 'textarea' | 'datepicker' | 'search';
    label: string;
    placeholder?: string;
    url?: string;
    resultData?: resultData[];
    formKey?: string;
    resultId?: string;
    displayKey?: string;
    format?: 'range' | 'single';
    singleLabel?: string;
    fromLabel?: string;
    toLabel?: string;
    resultSingle?: string;
    resultId1?: string;
    resultId2?: string;
    searchType?: 'user' | 'mobility' | 'station';
    hasEmail?: boolean;
    hasImage?: boolean;
  }

  export interface resultData {
    label: string;
    key: string;
  }