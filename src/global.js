import Vue from 'vue';

export const baseApiUrl = 'http://localhost:3000'
export const userKey = "__knowledge_user"

export function showError(e) {
  if (e && e.response && e.response.data.error) {
    Vue.toasted.global.defaultError({ msg: e.response.data.error })
  } else if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data })
  } else if (typeof e === 'string') {
    Vue.toasted.global.defaultError({ msg: e })
  } else {
    Vue.toasted.global.defaultError();
  }
}

export function showSuccess(e) {
  if (e && e.response && e.response.data.error) {
    Vue.toasted.global.defaultSuccess({ msg: e.response.data.error })
  } else if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultSuccess({ msg: e.response.data })
  } else if (typeof e === 'string') {
    Vue.toasted.global.defaultSuccess({ msg: e })
  } else {
    Vue.toasted.global.defaultSuccess();
  }
}


export default { baseApiUrl, showError, userKey }