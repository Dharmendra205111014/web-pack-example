/**
 * The Entry point for application
 */

 import { getMessage } from "./modules/message.js"

(function() {
    document.getElementById("app").innerHTML = getMessage();
})();
