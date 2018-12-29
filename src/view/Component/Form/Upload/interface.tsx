// form
export interface FormInterface {
  upload: any
}

// store
export interface StateInterface {
  csvTabs: string[]
  csvList: string[][][]
  tab: string
}

// view
export namespace View {
  export interface Props extends StateInterface {
  }

  // CompTable
  export interface CompTableProps {
    data: string[][]
  }
}

// ajax
export namespace Ajax {
}
