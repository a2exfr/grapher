import Proto from '../../../lib/proto/resolver'
import Controller from './controller'
import { schema } from './schema'

const controller = new Controller()

export default class extends Proto {
	constructor() {
		super(schema)
	}
	async config(_, { input }, { db, locale, auth }) {
		await controller.use(db, auth, locale).user.can(`${controller.table}-show`)

		return controller.one(input)
	}
	async configs(_, { input }, { db, locale, auth }) {
		await controller.use(db, auth, locale).user.can(`${controller.table}-show`)

		return controller.list(input)
	}
	async _modifyConfig(_, { input, keySeparator }, { db, locale, auth }) {
		await controller.use(db, auth, locale).user.can(`${controller.table}-add`)
		await controller.user.can(`${controller.table}-edit`)

		await controller.reAdd(input, keySeparator)

		return true
	}
	async _removeConfig(_, { key }, { db, locale, auth }) {
		await controller
			.use(db, auth, locale)
			.user.can(`${controller.table}-remove`)

		await controller.remove({ key })

		return true
	}
}
