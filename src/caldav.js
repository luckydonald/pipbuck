import { SimpleCalDAV } from 'simple-caldav';
import xmldoc from 'xmldoc';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
export default class BetterSimpleCalDAV extends SimpleCalDAV {
  async listEventsSince(
    startDate = undefined,
    endDate = undefined,
    transform = SimpleCalDAV.simplifyEvent,
  ) {
    let startDateFilter = null;
    let endDateFilter = null;
    if (startDate) {
      const startDateString = moment(startDate).utc().format('YYYYMMDD[T]HHmmss[Z]');
      startDateFilter = `start="${startDateString}"`;
    }
    if (endDate) {
      const endDateString = moment(endDate).utc().format('YYYYMMDD[T]HHmmss[Z]');
      endDateFilter = `end="${endDateString}"`;
    }
    let filter = '';
    if (startDateFilter || endDateFilter) {
      filter = `
        <c:comp-filter name="VCALENDAR">
          <c:comp-filter name="VEVENT">
            <c:time-range ${startDateFilter} ${endDateFilter} />
          </c:comp-filter>
        </c:comp-filter>`;
    } else {
      filter = `
        <c:comp-filter name="VCALENDAR" />
      `;
    }
    const res = await fetch(this.uri, {
      method: 'REPORT',
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
      ...this.options,
      body: `
        <c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
           <d:prop>
            <d:getetag />
            <c:calendar-data />
          </d:prop>
          <c:filter>
            ${filter}
          </c:filter>
        </c:calendar-query>`,
    });

    const text = await res.text();
    const doc = new xmldoc.XmlDocument(text);

    const responses = doc.childrenNamed('response');
    const events = responses.map((node) => {
      const href = this.uri + node.valueWithPath('href');
      let evt = node.valueWithPath('propstat.prop.C:calendar-data');
      evt = SimpleCalDAV.parseICS(evt);
      return transform(evt, href);
    });

    return events;
  }
}
