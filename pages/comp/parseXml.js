import $ from 'jquery'

export  function parseXml(text) {
  var parser, xmlDoc;

  parser = new DOMParser();
  xmlDoc = parser.parseFromString(text, "text/xml");

  var xml = $.parseXML(text);

  var elements = xmlDoc.getElementsByTagName("ENTRY");

  var includeAlbumInfo = $("#includeAlbumInfo").prop("checked");
  var listArtistFirst = $("#listArtistFirst").prop("checked");

  var tableStrings = new Object();
  var textStrings = new Object();

  var allStr = "";
  $("#tableBody").html("");
  $(xml)
    .find("NML ENTRY[TITLE]")
    .each(function (idx, el) {
      var element = $(el);
      var title = element.attr("TITLE");
      var artist = element.attr("ARTIST");
      var album = element.find("ALBUM").attr("TITLE");
      var filename =
        element.find("LOCATION").attr("VOLUME") +
        element.find("LOCATION").attr("DIR") +
        element.find("LOCATION").attr("FILE");
      var str =
        "<tr><td>" +
        title +
        "</td><td>" +
        artist +
        "</td><td>" +
        album +
        "</td></tr>";

      tableStrings[filename] = str;

      var line;

      if (listArtistFirst) {
        line =
          artist +
          " - " +
          title +
          (includeAlbumInfo ? " (" + album + ")" : "") +
          "\r\n";
      } else {
        line =
          title +
          " - " +
          artist +
          (includeAlbumInfo ? " (" + album + ")" : "") +
          "\r\n";
      }

      textStrings[filename] = line;
    });

  $(xml)
    .find("NML PLAYLIST ENTRY")
    .each(function (idx, el) {
      var element = $(el);
      var path = element.find("PRIMARYKEY").attr("KEY");

      $("#tableBody").append(tableStrings[path]);
      allStr += textStrings[path];
    });

  $("#textVersion").text(allStr);
  return allStr;
}
