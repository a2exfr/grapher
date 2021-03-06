import { fields } from './schema'
import User from '../../user/controller'
import Controller from '../../../lib/proto/controller'

export default class extends Controller {
	get force() {
		return false
	}
	get table() {
		return 'push-templates'
	}
	get fields() {
		return fields
	}
	get translateFields() {
		return this.locale.getFields(fields)
	}
	get user() {
		return new User().use(this.db, this.auth, this.locale)
	}
}
