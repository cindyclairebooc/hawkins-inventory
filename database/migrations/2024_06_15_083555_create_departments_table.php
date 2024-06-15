<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Ensure the departments and positions tables are created first
        $this->createDepartmentsAndPositions();

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('department_id')->nullable();
            $table->foreignId('position_id')->nullable();
        });

        // Update existing users to have valid department_id and position_id
        DB::table('users')->update([
            'department_id' => 1, // or any valid department id
            'position_id' => 1    // or any valid position id
        ]);

        // Now add foreign key constraints
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('position_id')->references('id')->on('positions')->onDelete('cascade');
        });
    }

    private function createDepartmentsAndPositions()
    {
        if (!Schema::hasTable('departments')) {
            Schema::create('departments', function (Blueprint $table) {
                $table->id();
                $table->string('dep_name');
                $table->text('dep_description');
                $table->timestamps();
            });
            // Insert a default department
            DB::table('departments')->insert([
                'dep_name' => 'Default Department',
                'dep_description' => 'This is the default department.'
            ]);
        }

        if (!Schema::hasTable('positions')) {
            Schema::create('positions', function (Blueprint $table) {
                $table->id();
                $table->string('pos_name');
                $table->text('pos_description');
                $table->timestamps();
            });
            // Insert a default position
            DB::table('positions')->insert([
                'pos_name' => 'Default Position',
                'pos_description' => 'This is the default position.'
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['position_id']);
            $table->dropColumn(['department_id', 'position_id']);
        });
    }
};
