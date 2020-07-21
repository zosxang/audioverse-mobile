import firebase from 'react-native-firebase';
import { select } from 'redux-saga/effects';

import I18n from '../../locales';
import * as selectors from '../reducers/selectors';

/**
 * Process startup action
 */
export function* startup() {
	const language = yield select(selectors.getLanguage);
	if (I18n.locale !== language) {
		I18n.locale = language;
	}
	const user = yield select(selectors.getUser);
	if (user) {
		firebase.analytics().setUserId(user.userId ? user.userId.toString() : null);
	}
	console.log('startup', I18n.locale, language, user);
}
