<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
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
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
