<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\User::create([
            'name' => 'Juan',
            'email' => 'Juan@ignition.com',
            'password' => bcrypt('147258369po'),
            'role' => 'admin'
        ]);
    
        \App\Models\User::create([
            'name' => 'Técnico Ejemplo',
            'email' => 'tecnico@ignition.com',
            'password' => bcrypt('password'),
            'role' => 'tecnico'
        ]);
    
        \App\Models\User::create([
            'name' => 'Cliente Ejemplo',
            'email' => 'cliente@ignition.com',
            'password' => bcrypt('password'),
            'role' => 'cliente'
        ]);
    }
}
