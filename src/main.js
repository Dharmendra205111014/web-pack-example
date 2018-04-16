/**
 * The Entry point for application
 */

import "./scss/main.scss"
//import 'jquery'
import 'bootstrap-loader'
import { getMessage } from "./modules/message.js"

(function() {
    document.getElementById("app").innerHTML = getMessage();
    $("#myModal").modal();
})();
