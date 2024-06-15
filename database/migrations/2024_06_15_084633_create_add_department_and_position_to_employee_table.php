<?php
use App\Models\Department;
use App\Models\Position;
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
        // Check if the columns already exist before adding them
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'department_id')) {
                $table->unsignedBigInteger('department_id')->nullable();
            }
            if (!Schema::hasColumn('users', 'position_id')) {
                $table->unsignedBigInteger('position_id')->nullable();
            }
        });

        // Add foreign key constraints
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'department_id')) {
                $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            }
            if (!Schema::hasColumn('users', 'position_id')) {
                $table->foreign('position_id')->references('id')->on('positions')->onDelete('cascade');
            }
        });

        // Ensure department_id and position_id are correctly set
        DB::table('users')
            ->leftJoin('departments', 'users.department_id', '=', 'departments.id')
            ->update(['users.department_id' => DB::raw('departments.id')]);

        DB::table('users')
            ->leftJoin('positions', 'users.position_id', '=', 'positions.id')
            ->update(['users.position_id' => DB::raw('positions.id')]);
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'department_id')) {
                $table->dropForeign(['department_id']);
                $table->dropColumn('department_id');
            }
            if (Schema::hasColumn('users', 'position_id')) {
                $table->dropForeign(['position_id']);
                $table->dropColumn('position_id');
            }
        });
    }
};

