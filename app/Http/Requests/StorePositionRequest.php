<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePositionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'pos_name' => 'required|string|max:255',
            'pos_description' => 'required|string'
        ];
    }
}