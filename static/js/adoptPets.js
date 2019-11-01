let ns = {};

ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    return {
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/adopt',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'create': function(adoptPet) {
            let ajax_options = {
                type: 'POST',
                url: 'api/adopt',
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(adoptPet)
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_create_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'update': function(adoptPet) {
            let ajax_options = {
                type: 'PUT',
                url: `api/adopt/${adopt.adoptID}`,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(adoptPet)
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_update_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'delete': function(adoptID) {
            let ajax_options = {
                type: 'DELETE',
                url: `api/adopt/${adoptID}`,
                accepts: 'application/json',
                contentType: 'plain/text'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_delete_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

ns.view = (function() {
    'use strict';

    let $adoptID = $('#adoptID'),
        $adoptName = $('#adoptName'),
        $adoptType = $('#adoptType'),
        $adoptBreed = $('#adoptBreed'),
        $adoptDesc = $('#adoptDesc'),
        $adoptAppearance = $('#adoptAppearance'),
        $adoptGender = $('#adoptGender'),
        $adoptSize = $('#adoptSize');

    return {
        reset: function() {
            $adoptID.val('');
            $adoptName.val('');
            $adoptType.val('');
            $adoptBreed.val('');
            $adoptDesc.val('');
            $adoptAppearance.val('');
            $adoptGender.val('');
            $adoptSize.val('');
        },
        update_editor: function(adoptPet) {
            $adoptID.val(adoptPet.adoptID);
            $adoptName.val(adoptPet.adoptName);
            $adoptType.val(adoptPet.adoptType);
            $adoptBreed.val(adoptPet.adoptBreed);
            $adoptDesc.val(adoptPet.adoptDesc);
            $adoptAppearance.val(adoptPet.adoptAppearance);
            $adoptGender.val(adoptPet.adoptGender);
        },
        build_table: function(pets) {
            let rows = ''

            // clear the table
            $('.pets table > tbody').empty();

            // did we get a movie array?
            if (pets) {
                for (let i=0, l=pets.length; i < l; i++) {
                    rows += `<tr data-id="${pets[i].adoptID}">
                        <td class="adoptName">${pets[i].adoptName}</td>
                        <td class="adoptType">${pets[i].adoptType}</td>
                        <td class="adoptBreed">${pets[i].adoptBreed}</td>
                        <td class="adoptDesc">${pets[i].adoptDesc}</td>
                        <td class="adoptAppearance">${pets[i].$adoptAppearance}</td>
                        <td class="adoptGender">${pets[i].adoptGender}</td>
                        <td class="adoptSize">${pets[i].adoptSize}</td>
                    </tr>`;
                }
                $('table > tbody').append(rows);
            }
        },
        error: function(error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function() {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $adoptID = $('#adoptID'),
        $adoptName = $('#adoptName'),
        $adoptType = $('#adoptType'),
        $adoptBreed = $('#adoptBreed'),
        $adoptDesc = $('#adoptDesc'),
        $adoptAppearance = $('#adoptAppearance'),
        $adoptGender = $('#AdoptGender'),
        $adoptSize = $('#AdoptSize');

    setTimeout(function() {
        model.read();
    }, 100)

    function validate(adoptName, adoptType, adoptBreed, adoptDesc, adoptAppearance, adoptGender, adoptSize) {
        return adoptName !== "" && adoptType !== "" && adoptBreed !== "" && adoptDesc !== "" && adoptAppearance !== "" && adoptGender !== "" && adoptSize !== "";
    }

    $('#create').click(function(e) {
        let adoptName = $adoptName.val(),
            adoptType = $adoptType.val(),
            adoptBreed = $adoptBreed.val(),
            adoptDesc = $adoptDesc.val(),
            adoptAppearance = $adoptAppearance.val(),
            adoptGender = $adoptGender.val(),
            adoptSize = $adoptSize.val();

        e.preventDefault();

        if (validate(adoptName, adoptType, adoptBreed, adoptDesc, adoptAppearance, adoptGender, adoptSize)) {
            model.create({
                'adoptName': adoptName,
                'adoptType': adoptType,
                'adoptBreed': adoptBreed,
                'adoptDesc': adoptDesc,
                'adoptAppearance': adoptAppearance,
                'adoptGender': adoptGender,
                'adoptSize': adoptSize,
            })
        } else {
            alert('Problem with one of the inputs');
        }
    });

    $('#update').click(function(e) {
        let adoptID = $adoptID.val(),
            adoptName = $adoptName.val(),
            adoptType = $adoptType.val(),
            adoptBreed = $adoptBreed.val(),
            adoptDesc = $adoptDesc.val(),
            adoptAppearance = $adoptAppearance.val(),
            adoptGender = $adoptGender.val(),
            adoptSize = $adoptSize.val();

        e.preventDefault();

        if (validate(adoptName, adoptType, adoptBreed, adoptDesc, adoptAppearance, adoptGender, adoptSize)) {
            model.update({
                'adoptID': adoptID,
                'adoptName': adoptName,
                'adoptType': adoptType,
                'adoptBreed': adoptDesc,
                'adoptDesc': adoptDesc,
                'adoptAppearance': adoptAppearance,
            })
        } else {
            alert('Problem with one of the inputs');
        }
        e.preventDefault();
    });

    $('#delete').click(function(e) {
        let id = $adoptID.val();

        e.preventDefault();

        if (validate('placeholder', adoptName)) {
            model.delete(id)
        } else {
            alert('Problem with one of the inputs');
        }
        e.preventDefault();
    });

    $('#reset').click(function() {
        view.reset();
    })

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            adoptID,
            adoptName,
            adoptType,
            adoptBreed,
            adoptDesc,
            adoptAppearance,
            adoptGender,
            adoptSize;
        adoptID = $target
            .parent()
            .attr('data-adoptID');

        adoptName = $target
            .parent()
            .find('td.adoptName')
            .text();

        adoptType = $target
            .parent()
            .find('td.adoptType')
            .text();

       	adoptBreed = $target
       		.parent()
       		.find('td.adoptBreed')
       		.text();

       	adoptDesc = $target
       		.parent()
       		.find('td.adoptDesc')
       		.text();

       	adoptAppearance = $target
       		.parent()
       		.find('td.adoptAppearance')
       		.text();

       	adoptGender = $target
       		.parent()
       		.find('td.adoptGender')
       		.text();

        adoptSize = $target
          .parent()
         	.find('td.adoptSize')
         	.text();

        view.update_editor({
            adoptID: adoptID,
            adoptName: adoptName,
            adoptType: adoptType,
            adoptBreed: adoptBreed,
            adoptDesc: adoptDesc,
            adoptAppearance: adoptAppearance,
            adoptGender: adoptGender,
        });
    });

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_delete_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));
