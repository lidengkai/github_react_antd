/**
 * @module history
 */
import { createHashHistory } from 'history'

const history = createHashHistory()

// history.listen((to, action) => {
//   console.log(to.pathname)
// })

export default history
