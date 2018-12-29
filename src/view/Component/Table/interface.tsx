// data
export interface DataSourceItemInterface {
  id: number
  name: string
  status: string
  value: string
}

// form
export interface ModalInfoFormInterface {
  id: number
  name: string
  value: string
}

// store
export interface StateInterface {
  loading: boolean
  name: string
  filters: {
    status?: string
  }
  sort: string
  order: string
  current: number
  pageSize: number
  total: number
  dataSource: DataSourceItemInterface[]
  infoShow: boolean
  infoData: {
    type?: 'add' | 'edit' | 'info'
    [x: string]: any
  }
  infoLoading: boolean
}

// view
export namespace View {
  // index
  export interface Props extends StateInterface {
  }

  // ModalInfo
  export interface ModalInfoProps {
    show: boolean
    data?: any
    loading?: boolean
  }
}

// ajax
export namespace Ajax {
  // list
  export namespace List {
    export interface Request {
      name?: string
      status?: string
      sort?: string
      order?: string
      current: number
      pageSize: number
    }

    export interface Response {
      count: number
      rows: DataSourceItemInterface[]
    }
  }

  // info
  export namespace Info {
    export interface Request {
      id: number
    }

    export interface Response extends DataSourceItemInterface {
    }
  }

  // set
  export namespace Set {
    export interface Request extends Partial<DataSourceItemInterface> {
      id: number
    }

    export interface Response {
    }
  }

  // del
  export namespace Del {
    export interface Request {
      id: number
    }

    export interface Response {
    }
  }
}
