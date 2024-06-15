<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'cat_name' => $this->cat_name,
            'cat_description' => $this->cat_description,
        ];
    }
}