<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'customer' => $this->customer,
            'product' => $this->product,
            'quantity' => $this->quantity,
            'status' => $this->status,
            'created_date' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}