// form
export interface FormInterface {
  username: string
  password: string
  remember: boolean
}

// store
export interface StateInterface {
}

// view
export namespace View {
  export interface Props extends StateInterface {
  }
}

// ajax
export namespace Ajax {
  // submit
  export namespace Submit {
    export interface Request {
      username: string
      password: string
    }

    export interface Response {
    }
  }
}
