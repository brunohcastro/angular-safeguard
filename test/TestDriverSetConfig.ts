import {inject, tick, fakeAsync} from '@angular/core/testing'

import {Driver} from 'Driver'
import {Locker} from 'Locker'

export const TestDriverSetConfig = function(driverName, driver: Driver) {
  describe(driverName, function() {
    const createDummy = (expires) => ({
      key: 'hi',
      data: 'bill',
      config: {expires}
    })

    const minInMilliseconds = (minutes: number) => minutes * 60000

    var locker: Locker

    beforeEach(inject([Locker], (lockerService: Locker) => locker = lockerService))

    it('can set expiry and have it expire at date', fakeAsync(function() {
      var cLocker = locker.useDriver(driver)

      const EXPIRY = new Date(),
            ADD_MINUTES = 10

      const DUMMY = createDummy(EXPIRY)

      cLocker.set(DUMMY.key, DUMMY.data, DUMMY.config)

      expect(cLocker.get(DUMMY.key)).toBeFalsy()
    }))

    it('can set expiry and before date will still fetch data', function() {
      var cLocker = locker.useDriver(driver)

      const EXPIRY = new Date()

      EXPIRY.setMinutes(EXPIRY.getMinutes() + 10)

      const DUMMY = createDummy(EXPIRY)

      cLocker.set(DUMMY.key, DUMMY.data, DUMMY.config)
      expect(cLocker.get(DUMMY.key)).toEqual(DUMMY.data)
    })
  })
}