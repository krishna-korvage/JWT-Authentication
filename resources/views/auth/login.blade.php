<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center mb-4">Login</h3>

            @if (session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form method="POST" action="{{ route('auth.login') }}" id="loginForm">
                @csrf
                <div class="form-group">
                    <label for="emailOrMobile">Email/Mobile</label>
                    <input type="text" class="form-control" id="emailOrMobile" name="email" value="{{ session('email', old('email')) }}" placeholder="Enter email/mobile" required>
                </div>

                <div class="form-group mt-3">
                    <label for="otp">Enter OTP</label>
                    <input type="text" class="form-control" id="otp" name="otp" placeholder="Enter OTP" disabled required>
                </div>

                <button type="submit" class="btn btn-primary" id="submitButton">Submit</button>
            </form>
        </div>
    </div>
</div>


<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>

<script>
    $(document).ready(function() {
        $('#loginForm').submit(function(event) {
            event.preventDefault(); 
            var url = '{{ route('auth.login') }}';
            var data = $(this).serialize();

            var isOtpDisabled = $('#otp').is(':disabled');

            if (isOtpDisabled) {
                
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    success: function(response) {
                        if (response.success) {
                           
                            $('#emailOrMobile').prop('disabled', true);
                            $('#otp').prop('disabled', false);
                            $('#submitButton').text('Submit OTP');
                        } else {
                            alert(response.message || 'An error occurred. Please try again.');
                        }
                    },
                    error: function(xhr) {
                       
                        if (xhr.responseJSON && xhr.responseJSON.message) {
                            alert(xhr.responseJSON.message);
                        } else {
                            alert('An error occurred. Please try again.');
                        }
                    }
                });
            } else {
               
                $('#emailOrMobile').prop('disabled', false);

                
                this.submit();
            }
        });
    });
</script>

</body>
</html>
