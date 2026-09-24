import { localStore } from './storage'

const KEY = 'knosis:privacy-ack:v1'

export function hasAcknowledgedPrivacyNotice(): boolean {
  return localStore.get(KEY) === '1'
}

export function acknowledgePrivacyNotice() {
  localStore.set(KEY, '1')
}
