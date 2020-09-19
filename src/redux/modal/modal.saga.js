// import { all, call, put, takeLatest } from 'redux-saga/effects'

// import { UPDATE_DEPOSIT_LIMIT_FAIL } from '~/redux/depositLimit/RequestDepositLimit.constants'

// import { openModal } from '../modal/modal.actions'
// import { UPDATE_REALITY_CHECK_FAIL } from '../realityCheck/RealityCheck.constants'
// import { UPDATE_TEMPORARY_SUSPENSION_FAIL } from '../temporarySuspension/TemporarySuspension.constants'
// import { UPDATE_SELF_EXCLUSION_FAIL } from '../selfExclusion/SelfExclusion.constants'
// import { UPDATE_MARKETING_PREF_FAIL } from '../marketingPref/MarketingPref.constants'
// import { UPDATE_EMAIL_FAIL } from '../email/UpdateEmail.constants'
// import { UPDATE_ADDRESS_FAIL } from '../address/UpdateAddress.constants'
// import { UPDATE_CONTACT_FAIL } from '../contact/UpdateContact.constants'
// import { UPDATE_PASSWORD_FAIL } from '../password/UpdatePassword.constants'

// export function* openErrorModal({ payload: { modalLabel, error } }) {
//   yield put(
//     openModal('errorModal', {
//       modalLabel,
//       error,
//     })
//   )
// }

// // open error modal for those operations that fail and should inform user
// export function* openErrorModalHandler() {
//   yield takeLatest(UPDATE_DEPOSIT_LIMIT_FAIL, openErrorModal)
//   yield takeLatest(UPDATE_REALITY_CHECK_FAIL, openErrorModal)
//   yield takeLatest(UPDATE_TEMPORARY_SUSPENSION_FAIL, openErrorModal)
//   yield takeLatest(UPDATE_SELF_EXCLUSION_FAIL, openErrorModal)
//   yield takeLatest(UPDATE_MARKETING_PREF_FAIL, openErrorModal)
//   yield takeLatest(UPDATE_EMAIL_FAIL, openErrorModal)
//   yield takeLatest(UPDATE_ADDRESS_FAIL, openErrorModal)
//   yield takeLatest(UPDATE_CONTACT_FAIL, openErrorModal)
//   yield takeLatest(UPDATE_PASSWORD_FAIL, openErrorModal)
// }

// // Export our sagas
// export function* modalSagas() {
//   yield all([call(openErrorModalHandler)])
// }
