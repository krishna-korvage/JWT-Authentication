<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    // 1. Get all activities (view)
    public function index()
    {
        $activities = Activity::all();
        return response()->json($activities);
    }

    // 2. Get a single activity (view specific activity)
    public function show($id)
    {
        $activity = Activity::find($id);
        
        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        return response()->json($activity);
    }

    // 3. Create a new activity
    public function store(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'required|string',
            'tagline' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'activity_type' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        // Create the activity
        $activity = Activity::create($validatedData);

        return response()->json(['message' => 'Activity created successfully', 'activity' => $activity], 201);
    }

    // 4. Delete an activity
    public function destroy($id)
    {
        $activity = Activity::find($id);

        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        // Delete the activity
        $activity->delete();

        return response()->json(['message' => 'Activity deleted successfully']);
    }
    
    public function getSlots($id)
{
    $activity = Activity::with('slots')->findOrFail($id);
    return response()->json($activity->slots);
}

}

