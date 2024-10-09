<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUsersTableRemovePasswordAndAddMobileOtp extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove the password column
            $table->dropColumn('password');

            // Add mobile and otp columns
            $table->string('mobile')->unique()->nullable();
            $table->string('otp')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add the password column back
            $table->string('password');

            // Drop the mobile and otp columns
            $table->dropColumn(['mobile', 'otp']);
        });
    }
}
