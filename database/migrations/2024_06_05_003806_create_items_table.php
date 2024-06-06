<?php

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
        Schema::create('items', function (Blueprint $table) {
            $table->id('items_id');
            $table->string('item_name');
            $table->date('manufactured_date');
            $table->decimal('price', 10, 2);
            $table->integer('stock');
            // $table->unsignedBigInteger('category_id');
            $table->timestamps();

        //     $table->foreign('category_id')
        //         ->references('category_id')
        //         ->on('category')
        //         ->onDelete('cascade')
        //         ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
