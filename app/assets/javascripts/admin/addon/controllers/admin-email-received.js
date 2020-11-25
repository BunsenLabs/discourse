import AdminEmailLogsController from "admin/controllers/admin-email-logs";
import discourseDebounce from "discourse-common/lib/debounce";
import IncomingEmail from "admin/models/incoming-email";
import { observes } from "discourse-common/utils/decorators";
import { INPUT_DELAY } from "discourse-common/config/environment";

export default AdminEmailLogsController.extend({
  @observes("filter.{status,from,to,subject}")
  filterIncomingEmails() {
    discourseDebounce(this, this.loadLogs, IncomingEmail, INPUT_DELAY);
  },

  actions: {
    loadMore() {
      this.loadLogs(IncomingEmail, true);
    },
  },
});
