$( document ).ready( function () {
    var container = d3.select('#tube-map');
    var width = 1600;
    var height = 1600;

    var map = d3.tubeMap()
        .width(width)
        .height(height)
        .margin({
            top: 20,
            right: 20,
            bottom: 40,
            left: 100,
        })
        .on("click", function (data) {
            const modal = $("#station_modal");
            modal.find('.modal-title').html(data.label);
            modal.find('.modal-body').html(data.modal_data.description);
            modal.modal('show');
        });

    d3.json("./stations1.json").then(function(data) {
        container
            .datum(data).call(map);

        var svg = container.select('svg');

        zoom = d3
            .zoom()
            .scaleExtent([0.5, 10])
            .on('zoom', zoomed);

        var zoomContainer = svg.call(zoom);
        var initialScale = 0.45;
        var initialTranslate = [-150, -30];

        zoom.scaleTo(zoomContainer, initialScale);
        zoom.translateTo(zoomContainer, initialTranslate[0], initialTranslate[1]);

        function zoomed() {
            svg.select('g').attr('transform', d3.event.transform.toString());
        }
    });




    $(".list-group-item").click(function (d) {
        $('#map_close').css("display", 'block');
        $('.list-group-item').removeClass('active');
        $(this).closest('.list-group-item').addClass('active');
        console.log(d.target.text);
    });

    $("#map_close").click(function (d) {
        $('#map_close').css("display", 'none');
        $('.list-group-item').removeClass('active');

    });
});