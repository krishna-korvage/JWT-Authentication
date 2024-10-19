<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class slot extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'time', 'activity_id'];

    // Each slot belongs to an activity
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
