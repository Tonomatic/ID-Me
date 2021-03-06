$(function () {
  var IDme = {
    access_token: window.location.hash
      .split("&")[0]
      .match(/[^#access_token=]\w+/)[0],

    params: function () {

      return {
        url:
        "https://api.id.me/api/public/v3/attributes.json?access_token=" +
        this.access_token,
        dataType: "jsonp"
      };
    },

    request: function () {
      if (this.access_token) {
        $.get(this.params()).done(function (payload) {
          if (payload.status[0].verified) {
            $("#idme-verification").hide();
            $("#idme-verification").before(
              "<span>Thank you dear <b>" +
              payload.attributes[0].value +
              "</b> for verifying your <b>" +
              payload.status[0].subgroups[0] +
              "</b> status with ID.me.</span>"
            );
            $("#idme-verification").before(
              "<div class=container>" +
              "<h3 class=frontText>Here's your information </h3>" +
              "<div> " + payload.attributes[1].name + ": <b>" + payload.attributes[1].value + "</b></div>" +
              "<div> " + payload.attributes[2].name + ": <b>" + payload.attributes[2].value + "</b></div>" +
              "</div>"
            );
          }
        })
        .fail(function() {
          $("#idme-verification").before(
            "<span>Sorry, there was an error, please Verifying again!</span>"
          );
        })
      }
    }
  };

  IDme.request();
});
