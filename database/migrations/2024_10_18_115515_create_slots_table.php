<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSlotsTable extends Migration
{
    public function up()
    {
        Schema::create('slots', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('time');
            $table->foreignId('activity_id')->constrained('activities')->onDelete('cascade'); // Create the relationship
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('slots');
    }
}