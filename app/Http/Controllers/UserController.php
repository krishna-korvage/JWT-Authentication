<?php namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
   
        public function index()
        {
            // Fetch the users from the database
            $users = User::all();
    
            // Return the Inertia response
            return Inertia::render('Users/index', [
                'users' => $users
            ]);
        }
    

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:3',
            'email' => 'required|email|unique:users',
            'mobile' => 'required|digits:10|unique:users',
        ]);

        $user = User::create($request->all());
        return response()->json($user, 201); // Return the created user
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $request->validate([
            'name' => 'sometimes|required|string|min:3',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'mobile' => 'sometimes|required|digits:10|unique:users,mobile,' . $id,
        ]);

        $user->update($request->all());
        return response()->json($user); // Return the updated user
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204); // Return 204 No Content
    }
}
