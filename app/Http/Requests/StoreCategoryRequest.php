<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function rules()
    {
        return [
            'cat_name' => 'required|string|max:255',
            'cat_description' => 'required|string'
        ];
    }
}