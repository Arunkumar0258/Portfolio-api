var form = document.getElementById('myForm');

function submitForm() {

        var data = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                phone: form.phone.value,
                password: form.password.value,
                email: form.email.value
        };

        fetch('/signup', {
                headers: {
                    'Accept': 'application/json',
                    'Content/Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: JSON.stringify(data)
        }).then(function(res) {
            if(!res.ok) alert('there was an error :((((');
            else res.json();
        }.catch(function(err) {
                alert('unexpected error');
        }))
}

function submitLogin() {
        var data = {
                email: form.email.value,
                password: form.password.value
        }

        fetch('/login', {
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: JSON.stringify(data)
        }.then(function(result) {
                if (!result.ok) alert('there was an error');
                return result.json().then(function(res) {
                        localStorage.token = res.token;
                        window.location = '/jet?token=' + res.token;
                alert('hello');
                }.catch(function(err) {
                console.log(err)
            }))
    }))
}


