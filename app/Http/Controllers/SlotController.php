<?php

// app/Http/Controllers/SlotController.php

namespace App\Http\Controllers;

use App\Models\Slot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SlotController extends Controller
{
    public function showslots(){
        return inertia::render('SlotScheduler');
    }
    public function store(Request $request)
    {
        $request->validate([
            'slots' => 'required|array',
            'slots.*.date' => 'required|date',
            'slots.*.time' => 'required',
            'slots.*.activity_id' => 'required|exists:activities,id',
        ]);

        foreach ($request->slots as $slotData) {
            Slot::create([
                'date' => $slotData['date'],
                'time' => $slotData['time'],
                'activity_id' => $slotData['activity_id'],
            ]);
        }

        return response()->json(['message' => 'Slots created successfully!'], 201);
    }
}

