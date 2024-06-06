<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'pos_name' => $this->pos_name,
            'pos_description' => $this->pos_description,
        ];
    }
}