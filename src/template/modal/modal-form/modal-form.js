import { Modal } from "../../../components/modal/modal";

new Modal({
  name: 'form',
  setup($modal) {
  },
})

/* Маска для телефона */
$(".tel").each(function () {
  var keyCode;
  function mask(event) {
    keyCode = event.keyCode || keyCode;
    var pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    var matrix = "+7 (___) ___-__-__", i = 0, def = matrix.replace(/\D/g, ""), val = $(this).val().replace(/\D/g, ""), new_value = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = new_value.indexOf("_");
    if (i !== -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i);
    }
    var reg = new RegExp(
      "^" + matrix.substr(0, $(this).val().length).replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&") + "$"
    );
    if (!reg.test($(this).val()) || $(this).val().length < 5 || keyCode > 47 && keyCode < 58) {
      $(this).val(new_value);
    }
    if (event.type === "blur" && $(this).val().length < 5) {
      $(this).val("");
    }
  }
  $(this).on("input focus blur keydown", mask);
});
