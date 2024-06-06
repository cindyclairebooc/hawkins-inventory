<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentRequest extends FormRequest
{
    public function rules()
    {
        return [
            'dep_name' => 'required|string|max:255',
            'dep_description' => 'required|string'
        ];
    }
}