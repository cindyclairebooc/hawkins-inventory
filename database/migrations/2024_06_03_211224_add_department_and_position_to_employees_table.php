<?php

use App\Models\Department;
use App\Models\Position;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('department_id')->nullable();
            $table->unsignedBigInteger('position_id')->nullable();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('position_id')->references('id')->on('positions')->onDelete('cascade');
        });

        DB::table('users')
        ->join('departments', 'users.department_id', '=', 'departments.id')
        ->update(['users.department_id' => DB::raw('departments.id')]);

        DB::table('users')
        ->join('positions', 'users.position_id', '=', 'positions.id')
        ->update(['users.position_id' => DB::raw('positions.id')]);
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['position_id']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['department_id', 'position_id']);
        });
    }
};
