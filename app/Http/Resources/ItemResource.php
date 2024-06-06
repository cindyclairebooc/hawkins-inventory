<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'items_id' => $this->items_id,
            'item_name' => $this->item_name,
            'manufactured_date' => $this->manufactured_date,
            'price' => $this->price,
            'stock' => $this->stock,
            // 'category_id' => $this->category_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}