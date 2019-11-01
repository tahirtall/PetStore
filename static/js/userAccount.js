let ns = {};

ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    return {
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/user',
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
        'create': function(userAcc) {
            let ajax_options = {
                type: 'POST',
                url: 'api/user',
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(userAcc)
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_create_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'update': function(userAcc) {
            let ajax_options = {
                type: 'PUT',
                url: `api/user/${userAcc.userID}`,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(userAcc)
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_update_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'delete': function(userAcc) {
            let ajax_options = {
                type: 'DELETE',
                url: `api/user/${userID}`,
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

    let $userID = $('#userID'),
        $userName = $('#userName'),
        $userFirst = $('#userFirst'),
        $userLast = $('#userLast'),
        $userPhone = $('#userPhone'),
        $userEmail = $('#userEmail'),
        $userAddress = $('#userAddress'),
        $userAddress2= $('#userAddress2'),
        $userState= $('#userState'),
        $userZip= $('#userZip');

    return {
        reset: function() {
            $userID.val('');
            $userName.val('');
            $userFirst.val('');
            $userLast.val('');
            $userPhone.val('');
            $userEmail.val('');
            $userAddress.val('');
            $userAddress2.val('');
            $userState.val('');
            $userZip.val('');
        },
        update_editor: function(userAcc) {
            $userID.val(userAcc.userID);
            $userName.val(userAcc.userName);
            $userFirst.val(userAcc.userFirst);
            $userLast.val(userAcc.userLast);
            $userPhone.val(userAcc.userPhone);
            $userEmail.val(userAcc.userEmail);
            $userAddress.val(userAcc.userAddress);
            $userAddress2.val(userAcc.userAddress2);
            $userState.val(userAcc.userState);
            $userZip.val(userAcc.userZip);
        },
        build_table: function(users) {
            let rows = ''

            // clear the table
            $('.users table > tbody').empty();

            // did we get a movie array?
            if (users) {
                for (let i=0, l=users.length; i < l; i++) {
                    rows += `<tr data-id="${users[i].userID}">
                        <td class="userName">${users[i].userName}</td>
                        <td class="userFirst">${users[i].userFirst}</td>
                        <td class="userLast">${users[i].userLast}</td>
                        <td class="userPhone">${users[i].userPhone}</td>
                        <td class="userEmail">${users[i].$userEmail}</td>
                        <td class="userAddress">${users[i].userAddress}</td>
                        <td class="userAddress2">${users[i].userAddress2}</td>
                        <td class="userState">${users[i].userState}</td>
                        <td class="userZip">${users[i].userZip}</td>
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
        $userID = $('#userID'),
        $userName = $('#userName'),
        $userFirst = $('#userFirst'),
        $userLast = $('#userLast'),
        $userPhone = $('#userPhone'),
        $userEmail = $('#userEmail'),
        $userAddress = $('#userAddress'),
        $userAddress2 = $('#userAddress2');
        $userState = $('#userState');
        $userZip = $('#userZip');

    setTimeout(function() {
        model.read();
    }, 100)

    function validate(userName, userFirst, userLast, userPhone, userEmail, userAddress, userAddress2, userState, userZip) {
        return userNamee !== "" && userFirst !== "" && userLast !== "" && userPhone !== "" && userEmail !== "" && userAddress2 !== "" && userState !== "" && userZip !== "";
    }

    $('#create').click(function(e) {
        let userName = $userName.val(),
            userFirst = $userFirst.val(),
            userLast = $userLast.val(),
            userPhone = $userPhone.val(),
            userEmail = $userEmail.val(),
            userAddress = $userAddress.val(),
            userAddress2 = $userAddress.val(),
            userState = $userState.val(),
            userZip = $userZip.val();

        e.preventDefault();

        if (validate(userName, userFirst, userLast, userPhone, userEmail, userAddress, userAddress2, userState, userZip)) {
            model.create({
              'userName' = $userName.val(),
              'userFirst' = $userFirst.val(),
              'userLast' = $userLast.val(),
              'userPhone' = $userPhone.val(),
              'userEmail' = $userEmail.val(),
              'userAddress' = $userAddress.val(),
              'userAddress2' = $userAddress.val(),
              'userState' = $userState.val(),
              'userZip' = $userZip.val(),
            })
        } else {
            alert('Problem with one of the inputs');
        }
    });

    $('#update').click(function(e) {
        let userName = $userName.val(),
            userFirst = $userFirst.val(),
            userLast = $userLast.val(),
            userPhone = $userPhone.val(),
            userEmail = $userEmail.val(),
            userAddress = $userAddress.val(),
            userAddress2 = $userAddress.val(),
            userState = $userState.val(),
            userZip = $userZip.val();

        e.preventDefault();

        if (validate(userName, userFirst, userLast, userPhone, userEmail, userAddress, userAddress2, userState, userZip)) {
            model.update({
              'userName' = $userName.val(),
              'userFirst' = $userFirst.val(),
              'userLast' = $userLast.val(),
              'userPhone' = $userPhone.val(),
              'userEmail' = $userEmail.val(),
              'userAddress' = $userAddress.val(),
              'userAddress2' = $userAddress.val(),
              'userState' = $userState.val(),
              'userZip' = $userZip.val(),
            })
        } else {
            alert('Problem with one of the inputs');
        }
        e.preventDefault();
    });

    $('#delete').click(function(e) {
        let id = $userID.val();

        e.preventDefault();

        if (validate('placeholder', userLast)) {
            model.delete(userID)
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
            userID,
            userName,
            userFirst,
            userLast,
            userPhone,
            userEmail,
            userAddress,
            userAddress2,
            userState,
            userZip;
        userID = $target
            .parent()
            .attr('data-userID');

        userName = $target
            .parent()
            .find('td.userName')
            .text();

        userFirst = $target
            .parent()
            .find('td.userFirst')
            .text();

       	userLast = $target
       		.parent()
       		.find('td.userLast')
       		.text();

       	userPhone = $target
       		.parent()
       		.find('td.userPhone')
       		.text();

       	userEmail = $target
       		.parent()
       		.find('td.userEmail')
       		.text();

       	userAddress = $target
       		.parent()
       		.find('td.userAddress')
       		.text();

        userAddress2 = $target
          .parent()
         	.find('td.userAddress2')
         	.text();

        userState = $target
          .parent()
          .find('td.userState')
          .text();

        userZip = $target
          .parent()
          .find('td.userZip')
          .text();

        view.update_editor({
            userID: userID,
            userName: userName,
            userFirst: userFirst,
            userLast: userLast,
            userPhone: userPhone,
            userEmail: userEmail,
            userAddress: userAddress,
            userAddress2: userAddress2,
            userState: userState,
            userZip: userZip,
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
