<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'dep_name' => $this->dep_name,
            'dep_description' => $this->dep_description,
        ];
    }
}