<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Order extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'orders';

    protected $fillable = [
        'customer',
        'product',
        'quantity',
        'status',
        // Add other fillable fields as needed
    ];

    // Define relationships if necessary
    // For example, if an order belongs to a user
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}